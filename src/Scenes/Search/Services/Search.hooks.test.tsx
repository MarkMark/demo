import { act, renderHook } from "@testing-library/react-hooks";

import { ProviderRedux } from "../../../Components/Redux/Provider";
import React from "react";
import { responseUnauthenticated } from "../../../MockData/Responses/Unauthenticated";
import spotifyApi from "../../../Services/Config/spotify";
import store from "../../../Services/Config/Store";
import { trackData } from "../../../MockData/Responses/Track";
import { useSearch } from "./Search.hooks";

jest.mock("../../../Services/Config/spotify.ts");
const mockedSpotify = spotifyApi as jest.Mocked<typeof spotifyApi>;

describe("Search for tracks based on entered value", () => {
  const wrapper = ({ children }: any) => (
    <ProviderRedux store={store}>{children}</ProviderRedux>
  );
  const { result, waitForNextUpdate } = renderHook(() => useSearch(), {
    wrapper,
  });

  expect(result.current.tracks).toStrictEqual([]);
  expect(result.current.searchValue).toBe("");
  expect(result.current.isSearching).toBeFalsy();
  expect(result.current.hasError).toBeFalsy();

  it("should return array of tracks when a value is entered & returns empty array once value is removed", () => {
    mockedSpotify.searchTracks.mockResolvedValueOnce(trackData);

    // Search for muse
    act(() => {
      result.current.setSearchValue("muse");
    });

    waitForNextUpdate().then(() => {
      expect(result.current.searchValue).toBe("muse");
      expect(result.current.tracks).toStrictEqual(trackData.tracks.items);
      expect(result.current.hasError).toBeFalsy();

      // Remove search value
      act(() => {
        result.current.setSearchValue("");
      });

      waitForNextUpdate().then(() => {
        expect(result.current.searchValue).toBe("");
        expect(result.current.tracks).toStrictEqual([]);
        expect(result.current.hasError).toBeFalsy();
      });
    });
  });

  it("should fail due to being unauthenticated", () => {
    mockedSpotify.searchTracks.mockImplementationOnce(() =>
      Promise.reject(new Error(responseUnauthenticated.error))
    );

    act(() => {
      result.current.setSearchValue("muse");
    });

    waitForNextUpdate().then(() => {
      expect(result.error).toBe(responseUnauthenticated.error);
      expect(result.current.searchValue).toBe("muse");
      expect(result.current.hasError).toBeTruthy();
    });
  });
});
