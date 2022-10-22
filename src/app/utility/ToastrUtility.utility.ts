import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class ToastrUtility
{
    constructor (private toastr: ToastrService)
    { }

    public showToastrInfo(message: string, title: string)
    {
        this.toastr.info(message, title);
    }

    public showToastrWarning(message: string, title: string)
    {
        this.toastr.warning(message, title);
    }

    public showToastrError(message: string, title: string)
    {
        this.toastr.error(message, title);
    }
}