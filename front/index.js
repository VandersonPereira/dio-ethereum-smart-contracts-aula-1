const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

var contractAddress = '0xfB88913974F05dBa65AA60CD40de31523E06083D';

var abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "getUser",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

contract = new web3.eth.Contract(abi, contractAddress);

var account;

web3.eth.getAccounts(function(err, accounts) {
    if (err != null){
        alert("Falha ao obter conta");
        return;
    }
    if (accounts.length == 0) {
        alert("Não foi possível acessar as contas");
        return;
    }
    account = accounts[0];
    console.log('Conta: ' + account);
    web3.eth.defaultAccount = account;
});

// Smart contract functions
function setUser() {
    var name = $("#userName").val();
    var age = $("#userAge").val();
    contract.methods.setUser (name, age).send({from: account}).then(function(tx) {
        console.log("Usuário registrado na transação: ", tx);
    });
    $("#userName").val('');
    $("#userAge").val('');
}

function getUser() {
    contract.methods.getUser().call().then(function(result) {
        console.log(result[0], result[1]);
        document.getElementById('user').innerHTML = ("Nome: " + result[0] + " " + "Idade: " + result[1]);
    });
}
