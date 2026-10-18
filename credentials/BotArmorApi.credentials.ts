import type { IAuthenticateGeneric, ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';

// A personal API key from the BotArmor dashboard (tab "API"). Sent as a Bearer token; never logged by the node.
export class BotArmorApi implements ICredentialType {
	name = 'botArmorApi';
	displayName = 'BotArmor API';
	documentationUrl = 'https://botarmor-arena.netlify.app';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Starts with ba_live_. Create it in the BotArmor dashboard, tab "API".',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://vps-57bd57fc.vps.ovh.net',
			description: 'Address of the BotArmor API',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: { headers: { Authorization: '=Bearer {{$credentials.apiKey}}' } },
	};

	test: ICredentialTestRequest = {
		request: { baseURL: '={{$credentials.baseUrl}}', url: '/api/agents' },
	};
}
