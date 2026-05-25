## Reduced Debug Toggle
Based on PacketEventsSK v1.1.4 with SkBee v3.23.0 on Paper v26.1.2

This examples can be used to hide things such as coordinates from players' f3 menus. It's a rather simple example.
Full list can be found here: [Debug Screen info lines](https://minecraft.wiki/w/Debug_screen#Information_lines) (more info on entity status can be found here: [Entity Statuses](https://minecraft.wiki/w/Java_Edition_protocol/Entity_statuses))
```applescript
# hides certain things (including XYZ) from the f3 menu
command toggleDebug:
    trigger:
        set {_entityId} to protocol id of player

        if {-debugMode::%player's uuid%} is true:
            set {-debugMode::%player's uuid%} to false
            set {_status} to 23
        else:
            set {-debugMode::%player's uuid%} to true
            set {_status} to 22

        set {_packet} to a new clientbound entity status packet:
            entity id: {_entityId}
            status: {_status}

        send packet {_packet} to player
```