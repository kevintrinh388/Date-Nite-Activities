"""Unit tests"""
import unittest
from unittest.mock import MagicMock, patch
from yelp import business_search
from maps import MAPS_KEY, maps_search


class FunctionTests(unittest.TestCase):
    """Class for all unit tests"""

    maxDiff = None

    def test_maps_search(self):
        result = maps_search("Atlanta")
        self.assertEqual(
            result,
            f"https://www.google.com/maps/embed/v1/search?key={MAPS_KEY}&q=Atlanta",
        )

    def test_maps_search_return_type(self):
        result = maps_search("Atlanta")
        self.assertEqual(
            type(result),
            type(
                f"https://www.google.com/maps/embed/v1/search?key={MAPS_KEY}&q=Atlanta"
            ),
        )

    def test_business_search_no_rating_price(self):
        """no filter_rating, api response contains objects that all contain price"""
        mock_response = MagicMock()
        mock_response.json.return_value = {
            "businesses": [
                {
                    "id": "1",
                    "rating": 1,
                    "price": "$",
                    "name": "Example1",
                    "url": "https://example.com/1",
                    "image_url": "http://example.com/1.jpg",
                    "location": {
                        "city": "Example1 City",
                        "country": "Example1 Country",
                        "address2": "",
                        "address3": "",
                        "state": "EX",
                        "address1": "1 Example St",
                        "zip_code": "11111",
                    },
                },
                {
                    "id": "2",
                    "rating": 2,
                    "price": "$$",
                    "name": "Example2",
                    "url": "https://example.com/2",
                    "image_url": "http://example.com/2.jpg",
                    "location": {
                        "city": "Example2 City",
                        "country": "Example2 Country",
                        "address2": "",
                        "address3": "",
                        "state": "EX",
                        "address1": "2 Example St",
                        "zip_code": "22222",
                    },
                },
                {
                    "id": "3",
                    "rating": 3,
                    "price": "$$$",
                    "name": "Example3",
                    "url": "https://example.com/3",
                    "image_url": "http://example.com/3.jpg",
                    "location": {
                        "city": "Example3 City",
                        "country": "Example3 Country",
                        "address2": "",
                        "address3": "",
                        "state": "EX",
                        "address1": "3 Example St",
                        "zip_code": "33333",
                    },
                },
                {
                    "id": "4",
                    "rating": 4,
                    "price": "$$$$",
                    "name": "Example4",
                    "url": "https://example.com/4",
                    "image_url": "http://example.com/4.jpg",
                    "location": {
                        "city": "Example4 City",
                        "country": "Example4 Country",
                        "address2": "",
                        "address3": "",
                        "state": "EX",
                        "address1": "4 Example St",
                        "zip_code": "44444",
                    },
                },
            ],
        }
        expected_output = [
            {
                "id": "1",
                "name": "Example1",
                "rating": 1,
                "image_url": "http://example.com/1.jpg",
                "url": "https://example.com/1",
                "location": {
                    "city": "Example1 City",
                    "country": "Example1 Country",
                    "address2": "",
                    "address3": "",
                    "state": "EX",
                    "address1": "1 Example St",
                    "zip_code": "11111",
                },
                "price": "$",
            },
            {
                "id": "2",
                "name": "Example2",
                "rating": 2,
                "image_url": "http://example.com/2.jpg",
                "url": "https://example.com/2",
                "location": {
                    "city": "Example2 City",
                    "country": "Example2 Country",
                    "address2": "",
                    "address3": "",
                    "state": "EX",
                    "address1": "2 Example St",
                    "zip_code": "22222",
                },
                "price": "$$",
            },
            {
                "id": "3",
                "name": "Example3",
                "rating": 3,
                "image_url": "http://example.com/3.jpg",
                "url": "https://example.com/3",
                "location": {
                    "city": "Example3 City",
                    "country": "Example3 Country",
                    "address2": "",
                    "address3": "",
                    "state": "EX",
                    "address1": "3 Example St",
                    "zip_code": "33333",
                },
                "price": "$$$",
            },
            {
                "id": "4",
                "name": "Example4",
                "rating": 4,
                "image_url": "http://example.com/4.jpg",
                "url": "https://example.com/4",
                "location": {
                    "city": "Example4 City",
                    "country": "Example4 Country",
                    "address2": "",
                    "address3": "",
                    "state": "EX",
                    "address1": "4 Example St",
                    "zip_code": "44444",
                },
                "price": "$$$$",
            },
        ]
        with patch("yelp.requests.get") as mock_get:
            mock_get.return_value = mock_response
            result = business_search("location", "term", 0, "1,2,3,4", "sort_by")
            self.assertEqual(result, expected_output)

    def test_business_search_no_rating_no_price(self):
        """no filter_rating, api response contains some objects with NO PRICE"""
        mock_response = MagicMock()
        mock_response.json.return_value = {
            "businesses": [
                {
                    "id": "1",
                    "rating": 1,
                    "name": "Example1NOPRICE",
                    "url": "https://example.com/1",
                    "image_url": "http://example.com/1.jpg",
                    "location": {
                        "city": "Example1 City",
                        "country": "Example1 Country",
                        "address2": "",
                        "address3": "",
                        "state": "EX",
                        "address1": "1 Example St",
                        "zip_code": "11111",
                    },
                },
                {
                    "id": "2",
                    "rating": 2,
                    "price": "$$",
                    "name": "Example2",
                    "url": "https://example.com/2",
                    "image_url": "http://example.com/2.jpg",
                    "location": {
                        "city": "Example2 City",
                        "country": "Example2 Country",
                        "address2": "",
                        "address3": "",
                        "state": "EX",
                        "address1": "2 Example St",
                        "zip_code": "22222",
                    },
                },
                {
                    "id": "3",
                    "rating": 3,
                    "name": "Example3NOPRICE",
                    "url": "https://example.com/3",
                    "image_url": "http://example.com/3.jpg",
                    "location": {
                        "city": "Example3 City",
                        "country": "Example3 Country",
                        "address2": "",
                        "address3": "",
                        "state": "EX",
                        "address1": "3 Example St",
                        "zip_code": "33333",
                    },
                },
                {
                    "id": "4",
                    "rating": 4,
                    "price": "$$$$",
                    "name": "Example4",
                    "url": "https://example.com/4",
                    "image_url": "http://example.com/4.jpg",
                    "location": {
                        "city": "Example4 City",
                        "country": "Example4 Country",
                        "address2": "",
                        "address3": "",
                        "state": "EX",
                        "address1": "4 Example St",
                        "zip_code": "44444",
                    },
                },
            ],
        }
        expected_output = [
            {
                "id": "1",
                "name": "Example1NOPRICE",
                "rating": 1,
                "image_url": "http://example.com/1.jpg",
                "url": "https://example.com/1",
                "location": {
                    "city": "Example1 City",
                    "country": "Example1 Country",
                    "address2": "",
                    "address3": "",
                    "state": "EX",
                    "address1": "1 Example St",
                    "zip_code": "11111",
                },
            },
            {
                "id": "2",
                "name": "Example2",
                "rating": 2,
                "image_url": "http://example.com/2.jpg",
                "url": "https://example.com/2",
                "location": {
                    "city": "Example2 City",
                    "country": "Example2 Country",
                    "address2": "",
                    "address3": "",
                    "state": "EX",
                    "address1": "2 Example St",
                    "zip_code": "22222",
                },
                "price": "$$",
            },
            {
                "id": "3",
                "name": "Example3NOPRICE",
                "rating": 3,
                "image_url": "http://example.com/3.jpg",
                "url": "https://example.com/3",
                "location": {
                    "city": "Example3 City",
                    "country": "Example3 Country",
                    "address2": "",
                    "address3": "",
                    "state": "EX",
                    "address1": "3 Example St",
                    "zip_code": "33333",
                },
            },
            {
                "id": "4",
                "name": "Example4",
                "rating": 4,
                "image_url": "http://example.com/4.jpg",
                "url": "https://example.com/4",
                "location": {
                    "city": "Example4 City",
                    "country": "Example4 Country",
                    "address2": "",
                    "address3": "",
                    "state": "EX",
                    "address1": "4 Example St",
                    "zip_code": "44444",
                },
                "price": "$$$$",
            },
        ]
        with patch("yelp.requests.get") as mock_get:
            mock_get.return_value = mock_response
            result = business_search("location", "term", 0, "1,2,3,4", "sort_by")
            self.assertEqual(result, expected_output)

    def test_business_search_filter_rating_price(self):
        """filter_rating = 3, api response contains objects that all contain price"""
        mock_response = MagicMock()
        mock_response.json.return_value = {
            "businesses": [
                {
                    "id": "1",
                    "rating": 1,
                    "price": "$",
                    "name": "Example1",
                    "url": "https://example.com/1",
                    "image_url": "http://example.com/1.jpg",
                    "location": {
                        "city": "Example1 City",
                        "country": "Example1 Country",
                        "address2": "",
                        "address3": "",
                        "state": "EX",
                        "address1": "1 Example St",
                        "zip_code": "11111",
                    },
                },
                {
                    "id": "2",
                    "rating": 2,
                    "price": "$$",
                    "name": "Example2",
                    "url": "https://example.com/2",
                    "image_url": "http://example.com/2.jpg",
                    "location": {
                        "city": "Example2 City",
                        "country": "Example2 Country",
                        "address2": "",
                        "address3": "",
                        "state": "EX",
                        "address1": "2 Example St",
                        "zip_code": "22222",
                    },
                },
                {
                    "id": "3",
                    "rating": 3,
                    "price": "$$$",
                    "name": "Example3",
                    "url": "https://example.com/3",
                    "image_url": "http://example.com/3.jpg",
                    "location": {
                        "city": "Example3 City",
                        "country": "Example3 Country",
                        "address2": "",
                        "address3": "",
                        "state": "EX",
                        "address1": "3 Example St",
                        "zip_code": "33333",
                    },
                },
                {
                    "id": "4",
                    "rating": 4,
                    "price": "$$$$",
                    "name": "Example4",
                    "url": "https://example.com/4",
                    "image_url": "http://example.com/4.jpg",
                    "location": {
                        "city": "Example4 City",
                        "country": "Example4 Country",
                        "address2": "",
                        "address3": "",
                        "state": "EX",
                        "address1": "4 Example St",
                        "zip_code": "44444",
                    },
                },
            ],
        }
        expected_output = [
            {
                "id": "3",
                "name": "Example3",
                "rating": 3,
                "image_url": "http://example.com/3.jpg",
                "url": "https://example.com/3",
                "location": {
                    "city": "Example3 City",
                    "country": "Example3 Country",
                    "address2": "",
                    "address3": "",
                    "state": "EX",
                    "address1": "3 Example St",
                    "zip_code": "33333",
                },
                "price": "$$$",
            },
            {
                "id": "4",
                "name": "Example4",
                "rating": 4,
                "image_url": "http://example.com/4.jpg",
                "url": "https://example.com/4",
                "location": {
                    "city": "Example4 City",
                    "country": "Example4 Country",
                    "address2": "",
                    "address3": "",
                    "state": "EX",
                    "address1": "4 Example St",
                    "zip_code": "44444",
                },
                "price": "$$$$",
            },
        ]
        with patch("yelp.requests.get") as mock_get:
            mock_get.return_value = mock_response
            result = business_search("location", "term", 3, "1,2,3,4", "sort_by")
            self.assertEqual(result, expected_output)

    def test_business_search_filter_rating_no_price(self):
        """filter_rating = 3, api response contains some objects with NO PRICE"""
        mock_response = MagicMock()
        mock_response.json.return_value = {
            "businesses": [
                {
                    "id": "1",
                    "rating": 1,
                    "name": "Example1NOPRICE",
                    "url": "https://example.com/1",
                    "image_url": "http://example.com/1.jpg",
                    "location": {
                        "city": "Example1 City",
                        "country": "Example1 Country",
                        "address2": "",
                        "address3": "",
                        "state": "EX",
                        "address1": "1 Example St",
                        "zip_code": "11111",
                    },
                },
                {
                    "id": "2",
                    "rating": 2,
                    "price": "$$",
                    "name": "Example2",
                    "url": "https://example.com/2",
                    "image_url": "http://example.com/2.jpg",
                    "location": {
                        "city": "Example2 City",
                        "country": "Example2 Country",
                        "address2": "",
                        "address3": "",
                        "state": "EX",
                        "address1": "2 Example St",
                        "zip_code": "22222",
                    },
                },
                {
                    "id": "3",
                    "rating": 3,
                    "name": "Example3NOPRICE",
                    "url": "https://example.com/3",
                    "image_url": "http://example.com/3.jpg",
                    "location": {
                        "city": "Example3 City",
                        "country": "Example3 Country",
                        "address2": "",
                        "address3": "",
                        "state": "EX",
                        "address1": "3 Example St",
                        "zip_code": "33333",
                    },
                },
                {
                    "id": "4",
                    "rating": 4,
                    "price": "$$$$",
                    "name": "Example4",
                    "url": "https://example.com/4",
                    "image_url": "http://example.com/4.jpg",
                    "location": {
                        "city": "Example4 City",
                        "country": "Example4 Country",
                        "address2": "",
                        "address3": "",
                        "state": "EX",
                        "address1": "4 Example St",
                        "zip_code": "44444",
                    },
                },
            ],
        }
        expected_output = [
            {
                "id": "3",
                "name": "Example3NOPRICE",
                "rating": 3,
                "image_url": "http://example.com/3.jpg",
                "url": "https://example.com/3",
                "location": {
                    "city": "Example3 City",
                    "country": "Example3 Country",
                    "address2": "",
                    "address3": "",
                    "state": "EX",
                    "address1": "3 Example St",
                    "zip_code": "33333",
                },
            },
            {
                "id": "4",
                "name": "Example4",
                "rating": 4,
                "image_url": "http://example.com/4.jpg",
                "url": "https://example.com/4",
                "location": {
                    "city": "Example4 City",
                    "country": "Example4 Country",
                    "address2": "",
                    "address3": "",
                    "state": "EX",
                    "address1": "4 Example St",
                    "zip_code": "44444",
                },
                "price": "$$$$",
            },
        ]
        with patch("yelp.requests.get") as mock_get:
            mock_get.return_value = mock_response
            result = business_search("location", "term", 3, "1,2,3,4", "sort_by")
            self.assertEqual(result, expected_output)


if __name__ == "__main__":
    unittest.main()
