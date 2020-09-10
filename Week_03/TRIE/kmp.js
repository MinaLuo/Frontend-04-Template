function kmp(source, pattern) {
    //计算table
    let table = new Array(pattern.length).fill(0);
    {
        //i自重复 已重复
        let i = 1, j = 0;

        while (i < pattern.length) {
            if (pattern[i] === pattern[j]) {
                ++j, ++i;
                table[i] = j;
            } else {
                if (j > 0) {
                    j = table[j];
                } else {
                    ++i;
                }
            }
        }
    }
    {
        let i = 0; j = 0;
        while (i < source.length) {
            if (pattern[j] === source[i]) {
                ++i; ++j;
            } else {
                if (j > 0) {
                    j = table[j];
                } else {
                    ++i;
                }
            }
            if (j === pattern.length) {
                return true;
            }
        }
        return false;
    }


    //abcdabce
    //aabaaac

    //匹配
}

console.log(kmp("abc", "abc"));

// a a b a a a c
// 0 0 1 0 1 2 2