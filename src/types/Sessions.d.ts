export type SessionsClient = {
	clientId: string;
	clientName: string;
	userConsentRequired: false;
	inUse: boolean;
	offlineAccess: boolean;
}

export type Sessions = {
	id: string;
	ipAddress: string;
	started: number;
	lastAccess: number;
	expires: number;
	clients: SessionsClient[];
	browser: string;
	current: boolean;
}

export type Devices = {
	os: string;
	osVersion: string;
	device: string;
	lastAccess: number;
	current: boolean;
	sessions: Sessions[]
}