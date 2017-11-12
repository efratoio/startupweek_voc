import * as React from "react";
import bind from "bind-decorator";

import { FaBars, FaPlusCircle} from "react-icons/lib/fa";

import * as css from "./action-bar.scss";

export class ActionBar extends React.Component {
	@bind
	private handleAdd() {

	}

	@bind
	private handleMenu() {

	}

	public render(): JSX.Element {
		return (
			<div className={css["action-bar"]}>
				<button onClick={this.handleMenu} className={css.button}>
					<FaBars size={30}/>
				</button>
				<button onClick={this.handleAdd} className={css.button}>
					<FaPlusCircle size={30}/>
				</button>
			</div>
		);
	}
}
