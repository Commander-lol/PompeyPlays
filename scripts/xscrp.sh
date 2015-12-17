#!/bin/bash

WID=`xdotool search --name RetroArch`
VALID="_z__x__q__w__Left__Right__Up__Down__Shift_R__Return_"
if [[ $WID == "" ]]
then
    echo 1
else
    if [[ $VALID == *"_$1_"* ]]
    then
        xdotool windowactivate $WID
        xdotool windowfocus $WID
        xdotool keydown $1
        xdotool keyup $1
        echo 0
    else
        echo 2
    fi
fi
