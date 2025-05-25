import { SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';

describe('Photo service', () => {
	it('returns a 404 if a non-existent endpoint is called', async () => {
		const response = await SELF.fetch('http://localhost:8787/2');
		expect(response.status).toEqual(404);
	});
});

describe('GET /images', () => {
	// Test for status code
	it('returns a 200 OK response', async () => {
		const response = await SELF.fetch('http://localhost:8787/images');
		expect(response.status).toEqual(200);
	});
	// Test for response content
	it('should return images in the response', async () => {
		const response = await SELF.fetch('http://localhost:8787/images');
		const json = await response.json();
		expect(json).toEqual(expect.arrayContaining([expect.objectContaining({ id: 3, url: 'https://bar.com/img1', author: 'Lara Lobster' })]));
	});
});

describe('POST /images', () => {
	it('should return a 201 response code', async () => {
		const payload = {
			id: 4,
			url: 'https://example.com/some_image.png',
			author: 'Lia',
		};
		const response = await SELF.fetch('http://localhost:8787/images', {
			method: 'POST',
			body: JSON.stringify(payload),
		});
		expect(response.status).toEqual(201);
	});
	it('should return the created image in the response', async () => {
		const newImage = {
			id: 4,
			url: 'https://example.com/some_image.png',
			author: 'Lia',
		};
		const response = await SELF.fetch('http://localhost:8787/images', {
			method: 'POST',
			body: JSON.stringify(newImage),
		});
		const json = await response.json();
		expect(json).toEqual(expect.objectContaining(newImage));
	});
});
