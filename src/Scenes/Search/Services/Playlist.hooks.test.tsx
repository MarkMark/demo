import { act, renderHook } from "@testing-library/react-hooks";

import { ProviderRedux } from "../../../Components/Redux/Provider";
import React from "react";
import { responsePlaylist } from "../../../MockData/Responses/Playlist";
import { responseTrackAdd } from "../../../MockData/Responses/TrackAdd";
import { responseUnauthenticated } from "../../../MockData/Responses/Unauthenticated";
import spotifyApi from "../../../Services/Config/spotify";
import store from "../../../Services/Config/Store";
import { trackData } from "../../../MockData/Responses/Track";
import { usePlaylist } from "./Playlist.hooks";

jest.mock("../../../Services/Config/shopify");
const mockedShopify = spotifyApi as jest.Mocked<typeof spotifyApi>;

describe("Creation and ability to export local playlist to Spotify", () => {
  const wrapper = ({ children }: any) => (
    <ProviderRedux store={store}>{children}</ProviderRedux>
  );
  const { result, waitForNextUpdate } = renderHook(() => usePlaylist(), {
    wrapper,
  });

  expect(result.current.tracks).toStrictEqual([]);
  expect(result.current.playlistData).toBe(null);

  it("should add track to local playlist", () => {
    act(() => {
      result.current.setTrack(trackData.tracks.items[0]);
    });

    waitForNextUpdate().then(() => {
      expect(result.current.tracks).toStrictEqual([...trackData.items[0]]);
    });
  });

  it("should create local playlist", () => {
    const formData = {
      name: "test playlist",
      description: "test description",
      public: true,
    };
    act(() => {
      result.current.setPlaylistData(formData);
    });

    waitForNextUpdate().then(() => {
      expect(result.current.playlistData).toBe(formData);
    });
  });

  it("should export the local playlist to spotify", () => {
    mockedShopify.createPlaylist.mockResolvedValueOnce(responsePlaylist);
    mockedShopify.addTracksToPlaylist.mockResolvedValueOnce(responseTrackAdd);

    act(() => {
      result.current.exportPlaylist();
    });

    waitForNextUpdate().then(() => {
      expect(result.current.isUploaded).toBeTruthy();
      expect(result.current.hasError).toBeFalsy();
      expect(result.current.isLoading).toBeFalsy();
    });
  });

  it("should fail to create a playlist", () => {
    mockedShopify.createPlaylist.mockImplementationOnce(() =>
      Promise.reject(new Error(responseUnauthenticated.error))
    );

    act(() => {
      result.current.exportPlaylist();
    });

    waitForNextUpdate().then(() => {
      expect(result.current.isUploaded).toBeFalsy();
      expect(result.current.hasError).toBeTruthy();
      expect(result.current.isLoading).toBeFalsy();
      expect(result.error).toBe(responseUnauthenticated.error);
    });
  });

  it("should succeed to create a playlist but fail adding a track", () => {
    mockedShopify.createPlaylist.mockResolvedValueOnce(responsePlaylist);
    mockedShopify.addTracksToPlaylist.mockImplementationOnce(() =>
      Promise.reject(new Error(responseUnauthenticated.error))
    );

    act(() => {
      result.current.exportPlaylist();
    });

    waitForNextUpdate().then(() => {
      expect(result.current.isUploaded).toBeFalsy();
      expect(result.current.hasError).toBeTruthy();
      expect(result.current.isLoading).toBeFalsy();
      expect(result.error).toBe(responseUnauthenticated.error);
    });
  });
});
