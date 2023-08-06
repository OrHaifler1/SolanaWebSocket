import asyncio
import websockets
import json


async def subscribe_to_logs():
    uri = "wss://white-withered-moon.solana-devnet.discover.quiknode.pro/98457dfa38986e4a9b90ccf4218b3bc69f3a0df5/"
    while True:
        try:
            async with websockets.connect(uri) as websocket:
                subscribe_request = {
                    "jsonrpc": "2.0",
                    "id": 1,
                    "method": "logsSubscribe",
                    "params": [
                        {"mentions": ["Bm2D4UAycWRgtpnuDaMoXWSkrzX64NUzGqQJ5jYzCv2b"]}
                    ],
                }
                await websocket.send(json.dumps(subscribe_request))
                while True:
                    response = await websocket.recv()
                    data = json.loads(response)
                    if "params" in data and "result" in data["params"]:
                        await process_log(data)

        except websockets.exceptions.ConnectionClosed:
            print("WebSocket connection closed. Retrying in 5 seconds...")
            await asyncio.sleep(5)
        except Exception as e:
            print(f"Error: {e}")
            break


async def process_log(logs):
    # Use web3.py or your preferred Ethereum library to fetch block data
    # and check for transactions related to the specific account you want to track.
    # If you find a relevant transaction, handle it here.
    print(logs)


if name == "main":
    asyncio.get_event_loop().run_until_complete(subscribe_to_logs())
