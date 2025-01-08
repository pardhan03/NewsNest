import { useCallback, useState } from "react";
import newsCategoryList from "../constants/Categories";

export const useNewCategories = () => {
  const [newCategories, setNewCategories] = useState(newsCategoryList);
  const toggleNewCategory = useCallback((id) => {
    setNewCategories((prev) => {
      return prev.map((news) => {
        if (news.id === id) {
          return {
            ...news,
            selected: !news.selected,
          };
        }
        return news;
      });
    });
  }, []);
  return {
    newCategories,
    toggleNewCategory,
  };
};
