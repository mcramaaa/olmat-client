import { create } from "zustand";

interface ILayoutStore {
  loading: boolean;
  loadingBlock: boolean;
  success: boolean;
  error: boolean;
  message: string;
  loadingCondition: string;
  permissions: string[];
  fillterByRef: string | undefined;
  isStatus: string;
}

const layoutStore = create<ILayoutStore>(() => ({
  error: false,
  loading: false,
  loadingBlock: false,
  success: false,
  message: "",
  permissions: [],
  fillterByRef: "",
  loadingCondition: "",
  isStatus: "all",
}));

export const useLayout = () => {
  // const isLoading = layoutStore((e) => e.loading)
  const fillterByRef = layoutStore((e) => e.fillterByRef);
  const isSuccess = layoutStore((e) => e.success);
  const isLoading = layoutStore((e) => e.loading);
  const isError = layoutStore((e) => e.error);
  const isMessage = layoutStore((e) => e.message);
  const permissions = layoutStore((e) => e.permissions);
  const isStatus = layoutStore((e) => e.isStatus);
  const loadingCondition = layoutStore((e) => e.loadingCondition);
  const isLoadingBlock = layoutStore((e) => e.loadingBlock);

  const setIsStatus = (setIsStatus: string) => {
    layoutStore.setState({
      isStatus: setIsStatus,
    });
  };

  const setFillterByRef = (setFillterByRef: string | undefined) => {
    layoutStore.setState({
      fillterByRef: setFillterByRef,
    });
  };

  const setPermissions = (setPermissions: string[]) => {
    layoutStore.setState({
      permissions: setPermissions,
    });
  };

  const setIsLoading = (setLoading: boolean) => {
    layoutStore.setState({
      loading: setLoading,
    });
  };

  const setIsLoadingBlock = (setLoadingBox: boolean) => {
    layoutStore.setState({
      loadingBlock: setLoadingBox,
    });
  };

  const setIsSuccess = (setSuccess: boolean, setMessage: string) => {
    layoutStore.setState({
      success: setSuccess,
      message: setMessage,
    });
  };

  const setError = (setError: boolean, setMessage: string) => {
    layoutStore.setState({
      error: setError,
      message: setMessage,
    });
  };

  const setMessage = (setMessage: string) => {
    layoutStore.setState({
      message: setMessage,
    });
  };

  return {
    isLoading,
    setIsLoading,
    isLoadingBlock,
    setIsLoadingBlock,
    isError,
    setError,
    fillterByRef,
    setFillterByRef,
    // isLoading,
    isSuccess,
    isStatus,
    setIsStatus,
    setIsSuccess,
    setMessage,
    isMessage,
    permissions,
    loadingCondition,
    setPermissions,
  };
};
