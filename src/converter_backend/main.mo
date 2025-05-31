import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Buffer "mo:base/Buffer";

actor CryptoConverter {

  // Estrutura preço histórico
  type PriceRecord = {
    timestamp : Time.Time;
    valueUSD : Float; // valor em USD para padronizar
  };

  // Dados da moeda
  type Coin = {
    code : Text; // Ex: "BTC"
    name : Text; // Ex: "Bitcoin"
    prices : [PriceRecord];
  };

  var coins : Buffer.Buffer<Coin> = Buffer.Buffer<Coin>(0);

  //Adiciona uma nova moeda com seu código, nome, valor e horário
  public func addCoin(cod : Text, name : Text, value : Float) : async () {
    let coin : Coin = {
      code = cod;
      name = name;
      prices = [{ timestamp = Time.now(); valueUSD = value }];
    };
    coins.add(coin);
  };

  // Edita o valor de uma moeda existente, mantendo o histórico
  public func editValueCoin(cod : Text, name : Text, newValue : Float) : async () {
    let updateCoin : Coin = {
      code = cod;
      name = name;
      prices = [{ timestamp = Time.now(); valueUSD = newValue }];
    };

    func locateCoin(c : Coin, d : Coin) : Bool {
      return c.code == d.code;
    };

    let index : ?Nat = Buffer.indexOf(updateCoin, coins, locateCoin);

    switch (index) {
      case (null) {};
      case (?i) {
        coins.put(i, updateCoin);
      };
    };
  };

  // Lista as moedas cadastradas
  public func getCoins() : async [Coin] {
    return Buffer.toArray(coins);
  };

  // Remove uma moeda pelo código
  public func deleteCoin(codDelete : Text) : async () {

    func locateCoin(i : Nat, c : Coin) : Bool {
      return c.code != codDelete;
    };

    coins.filterEntries(locateCoin);
  };


};
