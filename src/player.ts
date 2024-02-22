import { Player } from "discord-player";
import { client } from ".";

const player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 26,
  },
});

player.events.on("playerStart", (queue, track) => {
  console.log(track);
});

player.events.on("audioTrackAdd", (queue, track) => {
  console.log(track);
});

player.events.on("error", (queue, error) => {
  console.log(`channel: ${queue.id} \nerror:${error}`);
});
