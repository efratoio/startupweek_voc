**Processing data**
----
  Returns json data about a single user.

* **URL**

  /process

* **Method:**

  `POST`

* **Data Params**

   `data=[string]`
   
* **Success Response:**

  * **Code:** 202 <br />
    **Content:** `{ category : string, amount : float, currency:char }`

**Saving data**
----
  Returns json data about a single user.

* **URL**

  /save

* **Method:**

  `POST`

* **Data Params**

   `user=[string]`
   `category=[string]`
   `amount=[float]`
   `currency=[char]`
   
* **Success Response:**

  * **Code:** 200 <br />


**Getting table**
----
  Returns json data about a single user.

* **URL**

  /get

* **Method:**

  `GET`

* **URL Params**

   `user=[string]`
   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** Array of arrays of type:
    [string <user>, string <category>, char <currency>, float <amount>, string <datetime> ]
    
