import { useState, useEffect } from "react";
import axios from "axios";

import type { Devices } from "@/types/Sessions";

import { getOidc } from "@/account/oidc";


const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async (config) => {
	const oidc = await getOidc();

	config.headers.Authorization = `Bearer ${oidc.getTokens().accessToken}`;
	config.baseURL = oidc.params.issuerUri;

	return config;
});


export const getSessions = () => axiosInstance.get("/account/sessions/devices").then(response => response.data);

export const removeSessionById = (id: string) => axiosInstance.delete(`/account/sessions/${id}`);

export const useSessions = () => {
	const [sessions, setSessions] = useState<Devices[] | undefined>(undefined);

	useEffect(() => {
		getSessions().then(setSessions);
	}, []);


	return { sessions };
}