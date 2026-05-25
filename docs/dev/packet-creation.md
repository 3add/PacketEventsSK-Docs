# Packet Creation
PacketEventsSK allows the creation of packets from scratch. After creating a packet you can also send it to a player or receive it from a player.

## Packet Creation
To create a packet, you first have to choose the packet type you want to create. You can find a list of all packet types on SkDocs [Packet Type](https://skdocs.org/docs?id=PacketEventsSK-packettype).
After choosing the packet type, you can create the packet with the syntax:
```applescript
set {_packet} to a new [packet type]:
    [field 1]: [value 1]
    [field 2]: [value 2]
    ...
```
Where the fields are the fields of the packet you want to set. You can find a list of all packet fields on SkDocs [New Packet](https://skdocs.org/docs?id=PacketEventsSK-SecExprNewPacket).

## Simulate Sending or Receiving Packets
After creating a packet, you can also simulate sending or receiving it.
This is done with the syntax:
```applescript
send packet {_packet} to player 
receive packet {_packet} from player
```
You can also optionally do this silently, which means that no packet events will be fired for this packet. This is done with the syntax:
```applescript
send packet {_packet} to player silently
receive packet {_packet} from player silently
```