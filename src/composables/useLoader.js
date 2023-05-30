
import { ref, computed, reactive } from 'vue';


export default function useLoader(val = false) {
  // const state = reactive({
  //   status: val,
  //   contextStatus: {}
  // })
  const status = ref(val);
  const contextStatus = ref({});

  const loading = (bool) => {
    status.value = bool;
  };

  const contextLoading = (context, val) => {
    if (typeof val !== 'undefined') {
      contextStatus.value[context] = val;
      return;
    }

    return contextStatus.value[context];
  };

  return {
    loading,
    contextLoading,
    isLoading: status,
    isContextLoading: contextStatus
  };
}
