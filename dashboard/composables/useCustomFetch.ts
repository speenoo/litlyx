
type RefOrPrimitive<T> = T | Ref<T> | ComputedRef<T>

export type CustomOptions = {
    useSnapshotDates?: boolean,
    useActiveDomain?: boolean,
    useActivePid?: boolean,
    useTimeOffset?: boolean,
    slice?: RefOrPrimitive<string>,
    limit?: RefOrPrimitive<number | string>,
    custom?: Record<string, RefOrPrimitive<string>>,
}

const { token } = useAccessToken();
const { projectId } = useProject();
const { safeSnapshotDates } = useSnapshot()
const { domain } = useDomain();

function getValueFromRefOrPrimitive<T>(data?: T | Ref<T> | ComputedRef<T>) {
    if (!data) return;
    if (isRef(data)) return data.value;
    return data;
}

export function useComputedHeaders(customOptions?: CustomOptions) {
    const useSnapshotDates = customOptions?.useSnapshotDates || true;
    const useActivePid = customOptions?.useActivePid || true;
    const useTimeOffset = customOptions?.useTimeOffset || true;
    const useActiveDomain = customOptions?.useActiveDomain || true;

    const headers = computed<Record<string, string>>(() => {
        // console.trace('Computed recalculated');
        const parsedCustom: Record<string, string> = {}
        const customKeys = Object.keys(customOptions?.custom || {});
        for (const key of customKeys) {
            parsedCustom[key] = getValueFromRefOrPrimitive((customOptions?.custom || {})[key]) ?? ''
        }

        return {
            'Authorization': `Bearer ${token.value}`,
            'x-pid': useActivePid ? (projectId.value ?? '') : '',
            'x-from': useSnapshotDates ? (safeSnapshotDates.value.from ?? '') : '',
            'x-to': useSnapshotDates ? (safeSnapshotDates.value.to ?? '') : '',
            'x-time-offset': useTimeOffset ? (new Date().getTimezoneOffset().toString()) : '',
            'x-slice': getValueFromRefOrPrimitive(customOptions?.slice) ?? '',
            'x-limit': getValueFromRefOrPrimitive(customOptions?.limit)?.toString() ?? '',
            'x-domain': useActiveDomain ? (domain.value ?? '') : '',
            ...parsedCustom
        }
    })



    return headers;
}