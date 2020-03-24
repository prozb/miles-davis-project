import {getDistanceBetweenAlbums, getFullDistance, getReleaseDateFromAlbum, convertTimestampToYears} from '../scripts/helpers';
import {pixelsPerYear} from '../scripts/constants';

const item2 = {
	"Tutu": {
		"id": "Tutu",
		"released": "September 1986",
		"icon": "https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Miles_Davis-Tutu_%28album_cover%29.jpg/220px-Miles_Davis-Tutu_%28album_cover%29.jpg"
	}	
}

const item3 = {
	"Tutu": {
		"id": "Tutu",
		"released": "September 1, 1986",
		"icon": "https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Miles_Davis-Tutu_%28album_cover%29.jpg/220px-Miles_Davis-Tutu_%28album_cover%29.jpg"
	}	
}

const item4 = {
	"Tutu": {
		"id": "Tutu",
		"released": "September 2, 1986",
		"icon": "https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Miles_Davis-Tutu_%28album_cover%29.jpg/220px-Miles_Davis-Tutu_%28album_cover%29.jpg"
	}	
}

const item5 = {
	"Tutu": {
		"id": "Tutu",
		"released": "September 2, 1988",
		"icon": "https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Miles_Davis-Tutu_%28album_cover%29.jpg/220px-Miles_Davis-Tutu_%28album_cover%29.jpg"
	}	
}

// test('testing getting distance between two albums with equal release date', () => {
// 	expect(getDistanceBetweenAlbums(item3, item3)).toEqual(0);
// });

// test('testing getting distance between two albums', () => {
// 	expect(getDistanceBetweenAlbums(item3, item5)).toBeGreaterThan(2 * pixelsPerYear);
// });

// test('testing getting distance between incorrect albums', () => {
// 	expect(getDistanceBetweenAlbums(item3, null)).toEqual(0);
// });

// test('testing converting time to years, passing incorrect timestamp', () => {
// 	expect(convertTimestampToYears(null)).toEqual(0);
// });

test('testing converting time to years', () => {
	var time1 = new Date('1 January, 1995');
	var time2 = new Date('1 January, 1996');

	expect(convertTimestampToYears(Math.abs(time1 - time2))).toEqual(1);
});

// test('extract release date from album Tutu, passing correct album', () => {
// 	expect(getReleaseDateFromAlbum(item2)).toEqual("September 1986");
// });

// test('extract release date from incorrect album, return empty', () => {
// 	expect(getReleaseDateFromAlbum(null)).toEqual("");
// });