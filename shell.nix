{ pkgs ? import <nixpkgs> {} }:

with pkgs;

rec {
  normandy = stdenv.mkDerivation {
    name = "pokecalc";

    src = ./.;

    buildInputs = [
      atom
      nodejs-6_x
      zsh
    ];
  };
}
