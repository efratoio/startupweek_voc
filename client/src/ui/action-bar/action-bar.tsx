import * as React from "react";
import { external, inject } from "tsdi";
import bind from "bind-decorator";
import { History } from "history";

import { FaBars, FaPlusCircle } from "react-icons/lib/fa";
import { routeAdd } from "routing";

import * as css from "./action-bar.scss";

@external
export class ActionBar extends React.Component {
	@inject private browserHistory: History;

	@bind
	private handleAdd() {
		this.browserHistory.push(routeAdd());
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
