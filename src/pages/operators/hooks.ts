import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store";
import { fetchOperatorList } from "@/store/operators";

export const useOperators = () => {
  const dispatch = useAppDispatch();

  const operators = useAppSelector(state => state.operators.list);
  const operatorsLoading = useAppSelector(state => state.operators.listLoading);

  useEffect(() => {
    dispatch(fetchOperatorList());
  }, [dispatch]);

  return { operators, operatorsLoading };
};
