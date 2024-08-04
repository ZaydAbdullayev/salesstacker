import { useEffect } from 'react';
import { Audio } from 'expo-av';

const AutoAudioPlayer = ({ sound }) => {
    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require('./chin-up-554.mp3')
        );
        setSound(sound);
        await sound.playAsync();
    }

    useEffect(() => {
        playSound();
        return sound.unloadAsync;
    }, []);

    return null;
}

export default AutoAudioPlayer;
