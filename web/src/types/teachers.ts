export interface ITeachersProps {
    name: string;
    onFinish: (data: any) => any;
    loading: boolean;
    disabled: boolean;
    data?: ITeachersData;
    action: IAction
}

export interface ITeachersData {
    firstName: string;
    lastName: string;
    subject: string;
}

type IAction = "create" | "update"
