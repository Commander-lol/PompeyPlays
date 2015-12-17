#!/bin/bash
PDIR=`pwd`

if ! [ -x "$(command -v xdotool)" ]; then # RetroArch doesn't do command lines nicely, has to be bundled with xdotool check
    sudo add-apt-repository ppa:libretro/stable
    sudo apt-get update
    sudo apt-get install xdotool retroarch retroarch-* libretro-*
fi

# Enable if switching levelDB to Redis
#if ! [ -x ~/Programs/$REDISVER/src/redis-server ]; then
#    REDISVER="redis-3.0.5"
#    mkdir -p ~/Programs/tmp
#    mkdir -p ~/Programs/$REDISVER
#    cd ~/Programs/tmp
#    wget http://download.redis.io/releases/$REDISVER.tar.gz
#    tar xzf $REDISVER.tar.gz -C ../
#    cd ../$REDISVER
#    make
#    cd $PDIR
#fi
