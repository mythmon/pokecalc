{ pkgs ? import <nixpkgs> {} }:

with pkgs;

rec {
  normandy = stdenv.mkDerivation {
    name = "circleci-graphs";

    src = ./.;

    buildInputs = [
      atom
      nodejs-6_x
      zsh
    ];
  };
}
