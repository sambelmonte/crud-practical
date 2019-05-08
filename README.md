## GET /items
Retrieves all the items.

Sample Response:
```
{
  "results": [
     {
       "id": 1,
       "name": "Blue Suede Shoes",
       "qty": 16,
       "amount": 2050
     }, ...
  ],
  "length": 153,
}
```

## GET /items?id=<id>
Retrieves a single item.

Sample Response:
```
{
  "results": [
     {
       "id": 1,
       "name": "Blue Suede Shoes",
       "qty": 16,
       "amount": 2050
     }
  ],
  "length": 1,
}
```

## POST /items/new
Creates a single new item.

Sample Body:
```
{
	"name": "Roller Blades",
	"qty": 2,
	"amount": 5000
}
```

Sample Response:
```
{
  "item_id": 15
}
```

## PUT /items/update
Updates the details of a single item.

Sample Body:
```
{
  "id": 15
	"name": "Roller Blades",
	"qty": 2,
	"amount": 5000
}
```

Sample Response:
```
{
  "message": "Item updated successfully."
}
```

## PUT /items/quantity
Updates the quantity of a single item.

Sample Body:
```
{
	"id": 15,
	"value": 2,
	"add": false
}
```

Sample Response:
```
{
  "message": "Item updated successfully."
}
```

## DELETE /items?id=<id>
Removes a single item.

Sample Response:
```
{
  "message": "Item removed successfully."
}
```
