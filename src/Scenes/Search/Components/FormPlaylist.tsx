import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";

import { Box } from "../../../Components/Layout/Box";
import { Button } from "rendition";
import React from "react";
import { setIsAddPlaylistOpen } from "../Services/Playlist.Redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { usePlaylist } from "../Services/Playlist.hooks";

const Input = styled(Field)`
  display: block;
  margin-bottom: 8px;
  height: 20px;
  min-width: 200px;
`;

const SchemaPlaylist = Yup.object().shape({
  name: Yup.string().required("Required"),
});

export default function FormPlaylist() {
  const { setPlaylistData } = usePlaylist();
  const dispatch = useDispatch();

  return (
    <Box
      alignItems="center"
      bg="rgba(0, 0, 0, .3)"
      bottom="0"
      display="flex"
      height="100vh"
      justifyContent="center"
      left="0"
      position="fixed"
      right="0"
      top="0"
      width="100vw"
    >
      <Box bg="white" padding="16px">
        <h3>Create a playlist</h3>

        <Formik
          initialValues={{ name: "" }}
          validationSchema={SchemaPlaylist}
          onSubmit={(values, { setSubmitting }) => {
            setPlaylistData({
              ...values,
              ...{ public: true, description: "" },
            });

            dispatch(setIsAddPlaylistOpen(false));
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <label>Playlist name</label>
              <Input type="name" name="name" />
              <ErrorMessage name="name" component="div" />

              <Box display="flex">
                <Button
                  onClick={() => dispatch(setIsAddPlaylistOpen(false))}
                  mt="16px"
                >
                  Close
                </Button>
                <Button primary type="submit" disabled={isSubmitting} mt="16px">
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
