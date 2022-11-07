import {
	MAPPINGS_URL,
	MAPPING_DETAILS_URL,
	MAPPING_HEADERS_URL,
} from 'common/constants';
import { api, Mapping, MappingDetail, MappingHeader } from 'common/utils';

// Mappings

const getMappings = async (onlyActive?: boolean) => {
	return await api.get<Mapping[]>(MAPPINGS_URL, { onlyActive });
};

export const getQueryMappings = async (key: string, onlyActive?: boolean) => {
	return getMappings(onlyActive);
};

export const addMapping = async (mapping: any) => {
	return await api.post<Mapping>(MAPPINGS_URL, mapping);
};

export const editMapping = async (mapping: any) => {
	return await api.put<Mapping>(MAPPINGS_URL, mapping);
};

export const deleteMapping = async (id: string) => {
	return await api.delete(`${MAPPINGS_URL}/${id}`);
};

// Mapping Headers

const getMappingHeaders = async (mappingId: string) => {
	return await api.get<MappingHeader[]>(MAPPING_HEADERS_URL, { id: mappingId });
};

export const getQueryMappingHeaders = async (
	key: string,
	mappingId: string,
) => {
	return getMappingHeaders(mappingId);
};

export const addMappingHeader = async (header: any) => {
	return await api.post<MappingHeader>(MAPPING_HEADERS_URL, header);
};

export const editMappingHeader = async (header: any) => {
	return await api.put<MappingHeader>(MAPPING_HEADERS_URL, header);
};

export const deleteMappingHeader = async (id: string) => {
	return await api.delete(`${MAPPING_HEADERS_URL}/${id}`);
};

// Mapping Details

const getMappingDetails = async (mappingHeaderId: string) => {
	return await api.get<MappingDetail[]>(MAPPING_DETAILS_URL, {
		id: mappingHeaderId,
	});
};

export const getQueryMappingDetails = async (
	key: string,
	mappingId: string,
) => {
	return getMappingDetails(mappingId);
};

export const addMappingDetail = async (detail: any) => {
	return await api.post<MappingDetail>(MAPPING_DETAILS_URL, detail);
};

export const editMappingDetail = async (detail: any) => {
	return await api.put<MappingDetail>(MAPPING_DETAILS_URL, detail);
};

export const deleteMappingDetail = async (id: string) => {
	return await api.delete(`${MAPPING_DETAILS_URL}/${id}`);
};
