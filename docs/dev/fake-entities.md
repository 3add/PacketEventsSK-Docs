# Fake Entities

Fake Entities are a concept in PacketEventsSK which represent per-player entities.
They are not integrated with Minecraft's tracking system and thus are not real entities.
They are built using packets and thus have very little overhead compared to real entities.
Another advantage is that they don't need to be visible to all players.

## Data Representation
Fake entities are represented by entity metadata. 
See all [Meta Fields](https://skdocs.org/docs?id=PacketEventsSK-ExprMetaField).
Furthermore, some entities also have different data not represented by metadata (e.g. the skin of fake player). 
See all [Fake Entity Fields](https://skdocs.org/docs?id=PacketEventsSK-ExprFakeEntityField).

## Creating Fake Entities
In order to create an entity of a certain type, look up the type you want to create in the 
[Entity Type List](https://skdocs.org/docs?id=Skript-entitydata). 
To fully control the entity you often also have to create their metadata. 

Here's an example:
```applescript
on load:
    # Since meta can re-used, it is suggested you cache it like this,
    # especially if you are creating a lot of entities with the same properties.
    set {-meta} to a new text display entity meta:
        display text: "test"
        
command test:
    trigger:
        set {_entity} to a new fake text display entity:
            viewers: players
            location: location of player
            meta: {-meta}

        broadcast "Created fake entity with id %fake entity id of {_entity}%"
```

## Managing Fake Entities
Since fake entities don't support persistence, you can't store them in NBT or something like that. 
Instead, you use a reference system based on their protocol id. 
Every fake entity has a protocol id (like real entities do) which can be retrieved with the expression [Fake Entity ID](https://skdocs.org/docs?id=PacketEventsSK-ExprFakeEntityFromId).

Here's example of how to manage fake entities:
```applescript
command spawnfakeplayer:
    trigger:
        set {_p} to a new fake player entity:
            location: location of player
            viewers: all players
            skin: skin of player
            name: "test"

        add fake uuid of {_p} to {-uuid::*}
        add fake entity id of {_p} to {-id::*}

command lookup <text>:
    trigger:
        loop {-uuid::*}:
            if {-uuid::*} contains arg-1 parsed as uuid:
                send "Found %fake entity with uuid loop-value%"

        loop {-id::*}:
            if {-id::*} contains arg-1 parsed as integer:
                send "Found %fake entity with id loop-value%"
```