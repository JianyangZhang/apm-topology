import * as React from "react";
import * as ReactDOM from "react-dom";
import { Toolbar } from "./ui/Toolbar";
import { Network } from "./ui/Network";
import { Console } from "./ui/Console";
import { RightClickMenu } from "./ui/RightClickMenu";
import { didUpdate } from "../constants/didUpdate";
import { afterFinalMount } from "../constants/afterFinalMount";

export class Topology extends React.Component<any, any> {
    private menuItems: any;

    constructor(props, context) {
        super(props, context);
        this.state = this.initState();
        this.menuItems = [
            { text: "增加节点", type: "button", callback: () => { this.setState({ edit_mode: "add_node" }); } },
            { text: "编辑节点", type: "button", callback: () => { this.setState({ edit_mode: "edit_node" }); } },
            { text: "增加连接", type: "button", callback: () => { this.setState({ edit_mode: "add_edge" }); } },
            { text: "编辑连接", type: "button", callback: () => { this.setState({ edit_mode: "edit_edge" }); } },
            { text: "删除元素", type: "button", callback: () => { this.setState({ edit_mode: "delete_selected" }); } },
            { text: "改变布局", type: "button", callback: () => { this.setState({ edit_mode: "layout" }); } },
            { text: "锁定", type: "checkbox", callback: () => { this.setState({ edit_mode: "none", isLocked: !this.state.isLocked }); } },
        ]
    }

    private initState = () => {
        return {
            edit_mode: "none",
            isLocked: false
        };
    }

    componentDidUpdate() {
        didUpdate(this.state.isLocked);
    }

    componentDidMount() {
        afterFinalMount();
    }

    render() {
        return (
            <div id="main">
                <Toolbar items={this.menuItems} isLocked={this.state.isLocked} />
                <Network editMode={this.state.edit_mode} />
                <Console editMode={this.state.edit_mode} />
                <RightClickMenu items={this.menuItems} />
            </div>
        )
    }
};
