import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleWallAsync,
  selectSavedWall,
} from "../savedWall/savedWallSlice";

const SavedWall = () => {
  const { id } = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const wall = useSelector(selectSavedWall);
  console.log("ID____", id);
  const { wallId } = useParams();
  console.log("WALLID____", wallId);

  useEffect(() => {
    dispatch(fetchSingleWallAsync({userId: id, wallId: wallId}));
  }, []);

  return <div>{wall}</div>;
};

export default SavedWall;
