# Packet Listening

To listen to packets with PacketEventsSK you can use a single syntax element: [On Packet](https://skdocs.org/docs?id=PacketEventsSK-general_-_on_packet).
Let's break it down.

## Packet Processing

Packets in Minecraft are always processed on what is called the `netty` threads. 
This is a group of worker threads that handle all network communication for the server.
This means that if you want to intercept a packet, your code must be processed on the same threads
(note that you can still read the packets on the other threads).
The problem with this is that most of paper's API is not thread safe and can only be accessed on what is called the `main` thread (or `sync` thread).

### Netty Processing

This processing type should be used for the interception of packets.

```applescript
# "netty processed" ensures the packet is processed on the netty threads.
# This is the default process type for the event.
on any packet netty processed:
    if event-packet is clientbound entity metadata packet:
        # This packet won't be sent
        cancel packet
    else if event-packet is serverbound chat message packet:
        # This packet won't be received
        cancel packet
    else if event-packet is clientbound entity metadata packet:
        # this is a clone of the packet's meta
        set {_meta} to packet meta of event-packet
        set meta glowing state of {_meta} to true
        # Sets to the clone
        set packet meta of event-packet to {_meta}
```
> [!DANGER]  
> Minecraft is not thread safe, you can not access most of paper's API on the netty threads. If you want to access paper's API, you must switch back to the main thread.
> Look into [Run Task (SkBee)](https://skdocs.org/docs?id=SkBee-SecRunTaskLater) [Run Section (Skript-Reflect)](https://skdocs.org/docs?id=skript-reflect-EffRunSection).

### Sync Processing

This processing type should be used for interacting with paper's API with the data of a packet.

```applescript
on clientbound entity velocity sync processed:
	set {_id} to packet entity id of event-packet
	# this is not thread safe, thus sync processed
	set {_entity} to entity with id {_id}
	kill {_entity}
```
### Async Processing

This processing type should be used for heavy computation with the data of a packet. (Think anticheats analyzing movement packets)

```applescript
on clientbound entity velocity async processed:
    # ... heavy computation ...
```
> [!DANGER]  
> Minecraft is not thread safe, you can not access most of paper's API on the netty threads. If you want to access paper's API, you must switch back to the main thread.
> Look into [Run Task (SkBee)](https://skdocs.org/docs?id=SkBee-SecRunTaskLater) [Run Section (Skript-Reflect)](https://skdocs.org/docs?id=skript-reflect-EffRunSection).

## Listening to All Packets

This is how you can listen to all packets sent or received by the server.

```applescript
on any packet:
    # event-packet and event-player are retrievable
    # ... code ...
```

### Async Processing

This processing type should be used for heavy computation after

## Listening to a Packet Type

In PacketEventsSK packet types are defined by 2 parts, the direction (`serverbound` or `clientbound`) and the packet name (e.g. `entity metadata`).

Here's an example:

```applescript
on clientbound entity metadata packet:
    # event-packet and event-player are retrievable
    # ... code ...
```