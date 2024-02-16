import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddAndEditPreference,
  handleGetPreference,
} from "../../redux/AuthSlice";
import useAbortApiCall from "../../hooks/useAbortApiCall";
import toast from "react-hot-toast";

const CategoryModal = ({
  setShowCategoryMOdal,
  setSelectedCategories,
  selectedCategories = [],
  from,
}) => {
  const [tempSelectedCategories, setTempSelectedCategories] = useState([]);

  const { categories, categoryLoading, subCategoryloading, subCategories } =
    useSelector((s) => s.root.global);

  const { token, preferencesLoading } = useSelector((s) => s.root.auth);

  const dispatch = useDispatch();
  const { AbortControllerRef } = useAbortApiCall();

  const handleChange = (category) => {
    if (tempSelectedCategories.find((c) => c._id === category?._id)) {
      const filteredCategories = tempSelectedCategories.filter(
        (cate) => cate?._id != category?._id
      );
      setTempSelectedCategories(filteredCategories);
    } else {
      setTempSelectedCategories([...tempSelectedCategories, category]);
    }
  };

  const handleClickOnCancel = () => {
    setShowCategoryMOdal(false);
    setSelectedCategories(selectedCategories);
    // if (from === "set_your_preference") {
    // } else {
    // }
  };

  const handleClickOnSave = () => {
    setShowCategoryMOdal(false);
    setSelectedCategories(tempSelectedCategories);
    if (from === "set_your_preference") {
    } else {
      // const response = dispatch(
      //   handleAddAndEditPreference({
      //     token,
      //     selectedCategories: tempSelectedCategories,
      //     signal: AbortControllerRef,
      //   })
      // );
      // if (response) {
      //   response.then((res) => {
      //     if (res?.payload?.success) {
      //       setShowCategoryMOdal(false);
      //       toast.success(res?.payload?.message);
      //       dispatch(
      //         handleGetPreference({ token, signal: AbortControllerRef })
      //       );
      //     }
      //   });
      // }
    }
  };

  useEffect(() => {
    setTempSelectedCategories(selectedCategories);
  }, []);

  return (
    <>
      <div
        onClick={() => setShowCategoryMOdal()}
        className="fixed w-screen h-screen bg-black/20 backdrop-blur-sm inset-0 z-30"
      ></div>
      <div className="bg-white p-6 rounded-lg h-auto max-h-[80%] flex flex-col overflow-hidden xl:w-1/3 md:w-1/2 w-11/12 space-y-3 fixed top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
        <p className="text-left font-semibold text-2xl">Categories</p>
        {categoryLoading || subCategoryloading ? (
          <div className="text-center w-full font-semibold">Loading...</div>
        ) : (
          <div className="overflow-y-auto custom_scrollbar space-y-3 max-h-full px-2">
            {categories.length > 0 &&
              categories.map((category) => (
                <div
                  key={category?._id}
                  className="w-full flex items-center justify-between"
                >
                  <label htmlFor={category?.name}>{category?.name}</label>
                  <input
                    type="checkbox"
                    id={category?.name}
                    className="w-5 h-5 rounded-lg"
                    checked={tempSelectedCategories
                      .map((cate) => {
                        return cate?._id;
                      })
                      .includes(category?._id)}
                    onChange={(e) => handleChange(category)}
                  />
                </div>
              ))}
          </div>
        )}
        <div className="flex w-full items-center gap-3 justify-between">
          <button
            onClick={() => {
              handleClickOnCancel();
            }}
            disabled={preferencesLoading}
            className="darkGray_button w-1/2"
          >
            Cancel
          </button>
          <button
            className="green_button w-1/2"
            onClick={() => {
              handleClickOnSave();
            }}
            disabled={preferencesLoading}
          >
            {preferencesLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CategoryModal;
