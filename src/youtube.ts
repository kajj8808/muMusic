import { google } from "googleapis";

const API_KEY = process.env.YOUTUBE_API_KEY;

const youtube = google.youtube({ version: "v3", auth: API_KEY });

export async function searchYoutubeUrl(query: string) {
  try {
    const result = await youtube.search.list({
      q: query,
      maxResults: 5,
      part: ["snippet"],
      type: ["video"],
      topicId: "/m/04rlf",
      videoDuration: "any",
      order: "relevance",
    });

    const notMVTitles = result.data.items?.filter(
      (item) => !item.snippet?.title?.includes("MV")
    );

    const videoId = notMVTitles![0].id?.videoId;
    return `https://www.youtube.com/watch?v=${videoId}`;
  } catch (error) {
    console.log(error);
    return null;
  }
}
