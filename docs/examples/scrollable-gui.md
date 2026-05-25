# Scrollable GUI
Based on PacketEventsSK v1.1.3 with SkBee v3.23.0 on Paper v26.1.2

This example makes use of another unintended feature of the minecraft protocol that allows for a scrollable GUI (where the content scrolls with you)
There are multiple ways of doing this but one of the ways is intercepting a `serverbound select bundle item` packet and based of it's data determining in which direction the client scrolled.
Works like this:
1. user scrolls, the mc vanilla client sends `serverbound select bundle item`
2. the server receives the packet and reads it's content (on line 34-36)
3. we evaluate if the user scrolled up or down based on the data (line 68-87)
4. we update the GUI accordingly
```applescript
on load:
    set {-baseBundle} to a bundle with item flags hide additional tooltip
    add stone, stone, and stone to bundle contents of {-baseBundle}

command blocks:
    trigger:
        openBlocks(player)

function openBlocks(p: player, scroll: integer = 0):
    set {_gui} to new chest inventory with 6 rows named "Blocks"

    set {-prevPlayerScroll::%{_p}'s uuid%} to {_scroll}
    set {_skipAmount} to {_scroll} * 9
    set {_slot} to 0

    loop blocks:
        if any:
            loop-iteration <= {_skipAmount}
            type of loop-value is air
        then:
            continue
            
        if {_slot} >= 54:
            stop loop

        set {_i} to {-baseBundle} named proper case "&f%loop-value%"
        add stone, dirt and cobblestone to bundle contents of {_i}
        set item model of {_i} to "%namespaced key of loop-value%"
        
        set slot {_slot} of {_gui} to {_i}
    
        add 1 to {_slot}

    open {_gui} to {_p}
    
on serverbound select bundle item sync processed:
    set {_index} to packet selected item index of event-packet
    set {_slotId} to packet slot id of event-packet

    set {_action} to getScrollAction({-prevScroll::%{_slotId}%}, {_index}, 3)

    if {_action} is "DONE":
        clear {-prevScroll::%{_slotId}%}
    else:
        set {-prevScroll::%{_slotId}%} to {_index}
        
    if {_action} is "UP":
        clear {-prevScroll::%{_slotId}%}
        openBlocks(player, {-prevPlayerScroll::%player's uuid%} + 1)
    else if all:
        {_action} is "DOWN"
        {-prevPlayerScroll::%player's uuid%} - 1 > 0
    then:
        clear {-prevScroll::%{_slotId}%}
        openBlocks(player, {-prevPlayerScroll::%player's uuid%} - 1)

local function getScrollAction(prevIndex: integer, newIndex: integer, maxIndex: integer) :: string:
    if {_newIndex} is -1:
        return "DONE"

    if {_prevIndex} is not set: # first scroll
        if {_newIndex} is {_maxIndex} - 1:
            return "UP"
        else if {_newIndex} is 0:
            return "DOWN"

    if all:
        {_prevIndex} is {_maxIndex} - 1
        {_newIndex} is 0
    then:
        return "DOWN"

    if all:
        {_prevIndex} is 0
        {_newIndex} is {_maxIndex} - 1
    then:
        return "UP"

    if {_prevIndex} > {_newIndex}:
        return "UP"
    else:
        return "DOWN"
```
