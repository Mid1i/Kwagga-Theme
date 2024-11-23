import { useState, useEffect } from "react";
import { getOidc } from "../oidc";

import type { Devices } from "@/types/Sessions";


const authenticatedFetch: typeof fetch = async (path, options) => {
	const oidc = await getOidc();
	
	return fetch(`${oidc.params.issuerUri}${path}`, {
		...options,
		headers: {
			...options?.headers,
			Authorization: `Bearer ${oidc.getTokens().accessToken}`,
			"Content-Type": "application/json"
		}
	});
};


const getSessionsData = async (): Promise<Devices[]> => authenticatedFetch("/account/sessions/devices").then(response => response.json());


export const removeSessionById = async (id: string) => authenticatedFetch(`/account/sessions/${id}`, { method: "delete" });

export const useSessionsData = () => {
	const [sessionsData, setSessionsData] = useState<Devices[] | undefined>(undefined);

	useEffect(() => {
		getSessionsData().then(setSessionsData);
	}, []);


	return { sessionsData };
}