import reducer, {
  initialState,
  setHasError,
  setIsAddPlaylistOpen,
  setIsLoading,
  setIsUploaded,
  setPlaylistData,
  setTrack,
} from "./Playlist.Redux";

import { trackData } from "../../../MockData/Responses/Track";

describe("auth slice", () => {
  describe("reducer, actions and selectors", () => {
    it("should return the initial state on first run", () => {
      const nextState = initialState;
      const result = reducer(undefined, { type: undefined });

      expect(result).toEqual(nextState);
    });

    it("should properly set the create playlist details", () => {
      const data = {
        name: "Marks playlist",
        description: "This Marks playlist",
        public: true,
      };
      const result = reducer(initialState, setPlaylistData(data));

      expect(result.playlistData).toEqual(data);
    });

    it("should toggle the model open state", () => {
      const isOpen = true;
      let result = reducer(initialState, setIsAddPlaylistOpen(isOpen));

      expect(result.isAddPlaylistOpen).toEqual(isOpen);

      result = reducer(result, setIsAddPlaylistOpen(!isOpen));
      expect(result.isAddPlaylistOpen).toEqual(!isOpen);
    });

    it("should toggle the error state", () => {
      const hasError = true;
      let result = reducer(initialState, setHasError(hasError));

      expect(result.hasError).toEqual(hasError);

      result = reducer(result, setHasError(!hasError));
      expect(result.hasError).toEqual(!hasError);
    });

    it("should toggle the uploaded state", () => {
      const isUploaded = true;
      let result = reducer(initialState, setIsUploaded(isUploaded));

      expect(result.isUploaded).toEqual(isUploaded);

      result = reducer(result, setIsUploaded(!isUploaded));
      expect(result.isUploaded).toEqual(!isUploaded);
    });

    it("should toggle the loading state", () => {
      const isLoading = true;
      let result = reducer(initialState, setIsLoading(isLoading));

      expect(result.isLoading).toEqual(isLoading);

      result = reducer(result, setIsLoading(!isLoading));
      expect(result.isLoading).toEqual(!isLoading);
    });

    it("should add a track to the playlist then add another", () => {
      const tracks = trackData.tracks.items;
      const trackOne = tracks[0];
      const trackTwo = tracks[1];
      let result = reducer(initialState, setTrack(trackOne));

      expect(result.tracks).toEqual([trackOne]);

      result = reducer(result, setTrack(trackTwo));
      expect(result.tracks).toStrictEqual([trackOne, trackTwo]);
    });
  });
});
