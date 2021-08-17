pragma solidity >=0.4.22 <0.6.0;

contract RegistrationUser{
    
    // Propriedades
    string private name;
    uint256 private age;
    
    // Métodos/Funções
    function setUser(string memory _name, uint256 _age) public {
        name = _name;
        age = _age;
    }
    
    function getUser() public view returns (string memory, uint256) {
        return (name, age);
    }
}