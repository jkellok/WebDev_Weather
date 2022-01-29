function bar(arg) {
    console.log(arg);
}

let toto = function(func, arg) {
    func(arg);
}

toto(bar, 'cat');
toto((hoge) => {console.log(`*${hoge}*`);}, 'elephant');