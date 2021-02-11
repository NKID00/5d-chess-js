use wasm_bindgen::prelude::*;

use chess5dlib::prelude::*;
use chess5dlib::parse::parse;

#[wasm_bindgen]
pub fn print_parse(pgn: &str) {
    let game = parse(&pgn).expect("Couldn't parse game!");
    println!("{:?}", game.get_board((0, 0)));
}