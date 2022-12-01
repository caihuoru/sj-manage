
import Mock from 'mockjs2';

Mock.mock('/login', 'post', (opt: any) => {
    const postData = JSON.parse(opt.body);
    console.log(postData)
    // if ( postData.username === 'admin' && postData.password === '123qwe') {
        if ( postData.username === 'admin') {
        return {
            data: { code: 0 },
            token: 'admin',
        };
    }

    return {
        error: '账户或密码错误',
    };
});

export default Mock;
