import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";

import React from "react";
import { setPlaylistData } from "./Services/Playlist.Redux";
import { useDispatch } from "react-redux";

const SchemaPlaylist = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

export default function FormPlaylist() {
  const dispatch = useDispatch();

  return (
    <div>
      <Formik
        initialValues={{ name: "", description: "" }}
        validationSchema={SchemaPlaylist}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(setPlaylistData({ ...values, ...{ public: true } }));
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="name" name="name" />
            <ErrorMessage name="name" component="div" />

            <Field type="description" name="description" />
            <ErrorMessage name="description" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
