# [Refrostly](http://eckermania.github.io/refrostly/)
The Refrostly site provides a proof of concept for a web-based application that evaluates the success of a stocking algorithm in anticipated customer orders.  "Success" is defined as stock being available every time a customer places an order.  If stocking is successful, the app will provide a success message along with the excess inventory in stock at the end of the year. If a customer places an order for an item that has a current inventory of 0, the app will return the message of "Out of Stock" with the item and time of the "out of stock" event.

## Getting Started
To run this application on your local machine, you will need to set up a local server (e.g. Live Server).  If you wish to run the included test file, you will also need to install mocha and chai as dev dependencies.

### Data
The core data currently underpinning this app was provided by the client in the form of JSON files.  Additionally, the author created a dummy JSON file that would lead to an "Out of Stock" message in the app (data > restocks.failtest.json).

## Testing
Local testing is conducted using mocha and chai.

## Author
Erin Eckerman - [LinkedIn](https://www.linkedin.com/in/erineckerman/)

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/eckermania/refrostly/blob/master/LICENSE) for details.
