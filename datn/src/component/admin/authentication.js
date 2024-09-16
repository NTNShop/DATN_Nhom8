import React from 'react';
import style from '../../assets/authentication/style.css';


const Authentication = () => {
  return (
        <div className={style}>
          <div className ="row">
	<div className="col-md-6 mx-auto p-0">
		<div className="">
<div className="login-box">
	<div className="login-snip">
		<input id="tab-1" type="radio" name="tab" className="sign-in" checked/><label for="tab-1" className="tab">Đăng nhập</label>
		<input id="tab-2" type="radio" name="tab" className="sign-up"/><label for="tab-2" className="tab"></label>
		<div className="login-space">
			<div className="login">
				<div className="group">
					<label for="user" className="label">Tên đăng nhập</label>
					<input id="user" type="text" className="input"  placeholder="Nhập tên đăng nhập..."/>
				</div>
				<div className="group">
					<label for="pass" className="label">Mật khẩu</label>
					<input id="pass" type="password" className="input" data-type="password" placeholder="Nhập mật khẩu..."/>
				</div>
				<div className="group">
					<input id="check" type="checkbox" className="check" checked/>
					<label for="check"><span className="icon"></span> Giữ đăng nhập</label>
				</div>
				<div className="group">
					<input type="submit" className="button" value="Đăng nhập"/>
				</div>
				<div className="hr"></div>
				<div className="foot">
					<a href="#">Quên mật khẩu?</a>
				</div>
			</div>
		</div>
	</div>
</div>   
</div>
</div>
</div>

        </div>
      );
    };


export default Authentication;
