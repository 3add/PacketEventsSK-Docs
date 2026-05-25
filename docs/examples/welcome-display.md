# Welcome Display
Based on PacketEventsSK v1.1.3 with SkBee v3.23.0 on Paper v26.1.2
```applescript
on join:
    set {_p} to player

    set {_meta} to a new fake text display meta:
        display billboard: center
        display content: "<rainbow>WELCOME %{_p}%"

    set {_display} to a new fake text display entity:
        location: location 2 blocks infront of player
        viewers: player
        meta: {_meta}
 
    set {_interactionMeta} to a new fake interaction meta:
        interaction height: 1
        interaction width: 2

    set {_interactable} to a new fake interaction entity:
        location: location 2 blocks infront of player
        viewers: player
        meta: {_interactionMeta}

    set {-interactables::%{_p}'s uuid%} to fake entity id of {_interactable}

    wait 5 seconds

    kill fake entities {_display} and {_interactable}
    clear {-interactables::%player's uuid%}

on serverbound interact entity:
    set {_id} to packet field entity id of event-packet
    set {_hand} to packet field hand of event-packet
    set {_sneaking} to packet field sneaking state of event-packet

    if all:
        {_id} is {-interactables::%player's uuid%}
        # this packet is sent for each hand when just regular clicking
        # "main hand" is parsed as equipment slot if literal so we parse from text
        {_hand} is "main hand" parsed as interaction hand
        {_sneaking} is false
    then:
        send "<rainbow>welcome player!"
```