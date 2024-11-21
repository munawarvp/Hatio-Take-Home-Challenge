import requests

from hatiotodobackend.settings import GIST_TOKEN


class GistService:
    def __init__(self):
        self.base_url = "https://api.github.com/gists"
        self.token = GIST_TOKEN

    def create_gist(self, data):
        headers = {
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {self.token}",
            "X-GitHub-Api-Version": "2022-11-28"
        }
        
        response = requests.post(self.base_url, headers=headers, json=data)
        return response