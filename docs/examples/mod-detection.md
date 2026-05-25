# Mod Detection using sign epxloit
Based on PacketEventsSK v1.1.3 with SkBee v3.23.0 on Paper v26.1.2

This example makes use of a sign exploit described in [MC-265322](https://bugs.mojang.com/browse/MC/issues/MC-265322) and on [wurst wiki](https://wurst.wiki/sign_translation_vulnerability). It can be used to see which mods are or aren't installed on a connected player. (and is thus very powerful for anti cheating purposes)

Basically the way it works:
1. server sends a fake sign with a line having a translatable component or keybind component (`clientbound block change` packet and `clientbound block entity data` packet)
2. server forces the client to open the editor of the sign (`clientbound open sign editor` packet)
3. server forces the client to close the editor (`clientbound close window` packet)
4. client closes the editor and as a response sends the "new content" (which is unchanged) to the server (`serverbound update sign` packet **received by server on line 57**)
5. server reads the new content: if it parsed the translatable/keybind component it has the keybind set and thus has the mod otherwise not
```applescript
on load:
    delete {-blackListedKeybinds::*}
    add "key.freecam.toggle" to {-blackListedKeybinds::*}
    add "key.freecam.playerControl" to {-blackListedKeybinds::*}
    add "key.freecam.tripodReset" to {-blackListedKeybinds::*}
    add "key.freecam.configGui" to {-blackListedKeybinds::*}

function createSignNBT(bind: string) :: nbt compound:
    set {_nbtString} to "{front_text:{messages:[{""keybind"":""%{_bind}%""},{""text"":""""},{""text"":""""},{""text"":""""}]}}"
    return nbt compound from {_nbtString}

function startKeybindChecks(p: player):
    set {_uuid} to uuid of {_p}
    
    delete {-keybindQueue::%{_uuid}%::*}
    
    loop {-blackListedKeybinds::*}:
        add loop-value to {-keybindQueue::%{_uuid}%::*}
        
    checkNextKeybind({_p})

function checkNextKeybind(p: player):
    set {_uuid} to uuid of {_p}
    
    set {_keybind} to first element of {-keybindQueue::%{_uuid}%::*}
    
    if {_keybind} is set:
        check({_p}, {_keybind})
    else:
        delete {-keybindQueue::%{_uuid}%::*}

function check(p: player, keybind: string):
    set {_pos} to vector of {_p}'s location

    set {_blockPacket} to a new clientbound block change packet:
        block position: {_pos}
        block state: oak sign[]

    set {_setTextPacket} to a new clientbound block entity data packet:
        block position: {_pos}
        block entity type: sign block entity type
        nbt compound: createSignNBT({_keybind})

    set {_signPacket} to clientbound open sign editor packet:
        block position: {_pos}
        sign side: front
    
    set {_closeWindowPacket} to a clientbound close window packet

    set {_revertBlockPacket} to new clientbound block change packet:
        block position: {_pos}
        block state: air[]
    
    # Sends the packets (order sensitive)
    send packet {_blockPacket}, {_setTextPacket}, {_signPacket}, {_closeWindowPacket} and {_revertBlockPacket} to {_p} 

on serverbound update sign packet sync processed:
    set {_p} to event-player
    set {_uuid} to uuid of {_p}
    
    if {-keybindQueue::%{_uuid}%::*} is set:
        
        set {_firstIndex} to first element of indices of {-keybindQueue::%{_uuid}%::*}
        set {_expected} to {-keybindQueue::%{_uuid}%::%{_firstIndex}%}
        
        delete {-keybindQueue::%{_uuid}%::%{_firstIndex}%}

        set {_updateSignPacket} to event-packet
        set {_text} to first element of packet sign lines of event-packet

        if {_text} is not {_expected}:
            delete {-keybindQueue::%{_uuid}%::*}
            kick {_p} due to "Unsupported client modification detected!"
        else:
            send "%{_p}% passed keybind check for: %{_expected}%" to console
            wait 1 tick
            if {_p} is online:
                checkNextKeybind({_p})
                
on join:
    wait 3 seconds
    startKeybindChecks(player)
```