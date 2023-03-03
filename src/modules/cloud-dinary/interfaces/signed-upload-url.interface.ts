export interface ISignedUploadUrlOptions {
	folder?: string;
	eager?: string;
}

export const defaultCreateSignedUploadUrlOptions: Partial<ISignedUploadUrlOptions> =
	{
		folder: undefined,
		eager: undefined,
	};