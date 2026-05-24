# Prerequisites
## Networking and TCP
PacketEventsSK allows modifying packets which is what games use to transfer data between the client (where you play Minecraft) and the server (the computer running the Minecraft server). Minecraft Java Edition (unline Bedrock Edition) relies on TCP protocol. In summary, when using TCP, there are some promises that are made to you (the developer).

### TCP Promises
- The order in which packets are sent by the client is the same order in which they are received by the server
- Dropped packets are rescheduled, if a sending a packet fails for any reason, the server will try again (assuming the server isn't shut down)

## Minecraft Protocol
Some knowledge of the [Minecraft Protocol](https://minecraft.wiki/w/Java_Edition_protocol) and general experience is skript is highly suggested, generally working with packets should be a last resort and using the server api should be your first choice. Because the protocol constantly changes: it's quite hard to write a proper documentation for it. The maintainers of the Minecraft Wiki is the closest you'll get to accurate documentation. Thus the minecraft wiki is your best friend when using PacketEventsSK.

## Threading & Concurrency
Some knowledge of how threading and concurrency works is also suggested. The server processes packets on different threads than the world is generated. Because these processes are sometimes running on entirely different parts of the CPU, they can't simply access each other's data.

## Support
If u have any questions regarding any of these topics don't be afraid to ask for help in [our Discord server](https://discord.gg/qWUnW2juJ5)